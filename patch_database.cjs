const fs = require('fs');
let content = fs.readFileSync('utils/database.ts', 'utf8');

const originalSaveEntry = `  public async saveEntry(type: DatabaseEntry['type'], data: any): Promise<DatabaseEntry> {
    const entryData = {
      createdAt: new Date().toISOString(),
      type,
      data,
      status: 'new'
    };
    
    const docRef = await addDoc(this.getCollection(), entryData);
    return { id: docRef.id, ...entryData } as DatabaseEntry;
  }`;

const newSaveEntry = `  public async saveEntry(type: DatabaseEntry['type'], data: any): Promise<DatabaseEntry> {
    const entryData = {
      createdAt: new Date().toISOString(),
      type,
      data,
      status: 'new'
    };
    
    // 1. Save to Firebase First
    const docRef = await addDoc(this.getCollection(), entryData);
    const entry = { id: docRef.id, ...entryData } as DatabaseEntry;

    // 2. Trigger Email Notification (Non-blocking)
    try {
      fetch('/api/notify-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data, entryId: docRef.id })
      }).catch(err => console.error("Email notification failed:", err));
    } catch (e) {
      console.error("Failed to fetch notification API", e);
    }

    return entry;
  }`;

content = content.replace(originalSaveEntry, newSaveEntry);
fs.writeFileSync('utils/database.ts', content);
console.log("Patched database.ts with email notification");
