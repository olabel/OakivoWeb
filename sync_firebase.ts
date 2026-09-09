import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { insightsData } from './content/insights';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function sync() {
  console.log('Syncing insights to Firebase...');
  for (const insight of insightsData) {
    await setDoc(doc(db, 'insights', insight.id), insight);
    console.log(`Saved: ${insight.title}`);
  }
  console.log('Done syncing.');
  process.exit(0);
}

sync().catch(console.error);
