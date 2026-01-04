import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const GIST_ID = '5d43be1043ca3e39a8d3d214392a870e';
const USERNAME = 'astorimattia';
const FILE_NAME = 'location.json';
const OUTPUT_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/location_history.json');

async function fetchCommits() {
    let commits = [];
    let page = 1;

    while (true) {
        console.log(`Fetching commits page ${page}...`);
        const response = await fetch(`https://api.github.com/gists/${GIST_ID}/commits?page=${page}&per_page=100`, {
            headers: {
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch commits: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.length === 0) break;

        commits = commits.concat(data);
        page++;

        // Safety break to prevent infinite loops if something goes wrong
        if (page > 10) break;
    }

    return commits;
}

async function fetchFileContent(commitSha) {
    const url = `https://gist.githubusercontent.com/${USERNAME}/${GIST_ID}/raw/${commitSha}/${FILE_NAME}`;
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        return await response.json();
    } catch (err) {
        console.error(`Failed to fetch content for commit ${commitSha}:`, err);
        return null;
    }
}

async function main() {
    try {
        console.log('Starting location history fetch...');

        const commits = await fetchCommits();
        console.log(`Found ${commits.length} commits.`);

        const history = [];

        // Process commits sequentially to respect rate limits and order
        for (const commit of commits) {
            const date = commit.committed_at;
            const sha = commit.version;

            console.log(`Processing commit ${sha.substring(0, 7)} from ${date}...`);

            const content = await fetchFileContent(sha);

            if (content && content.city) {
                history.push({
                    date: date,
                    city: content.city,
                    // store raw data just in case structure changes, but mainly we want city/date
                    ...content
                });
            }
        }

        // Sort by date ascending (oldest to newest)
        history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Filter out duplicates where city didn't change if desired? 
        // The user asked for "all location logs", so keeping every entry is safer.
        // However, adjacent identical entries might be redundant. 
        // Let's keep them all for now as "logs".

        const outputDir = path.dirname(OUTPUT_FILE);
        await fs.mkdir(outputDir, { recursive: true });

        await fs.writeFile(OUTPUT_FILE, JSON.stringify(history, null, 2));

        console.log(`Successfully wrote ${history.length} location records to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    }
}

main();
