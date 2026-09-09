import { db } from './utils/database';
import { insightsData } from './content/insights';

async function sync() {
  console.log("Syncing insights to Firebase...");
  try {
    for (const post of insightsData) {
      await db.saveInsight(post);
      console.log("Saved: " + post.title);
    }
    console.log("Done syncing.");
  } catch (e) {
    console.error(e);
  }
}
sync();
