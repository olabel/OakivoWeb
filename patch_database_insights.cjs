const fs = require('fs');
let content = fs.readFileSync('utils/database.ts', 'utf8');

const additionalMethods = `
  public async saveInsight(post: any): Promise<void> {
    const { id, ...data } = post;
    const docRef = doc(firestoreDb, 'insights', id);
    await updateDoc(docRef, data).catch(async (e) => {
      // If it doesn't exist, create it. Wait, updateDoc fails if not found, use setDoc instead.
    });
  }
`;
// Let's do it properly with setDoc.
