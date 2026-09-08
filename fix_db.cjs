const fs = require('fs');
let content = fs.readFileSync('utils/database.ts', 'utf8');

const methods = `
  public async getInsights(): Promise<any[]> {
    try {
      const q = query(collection(firestoreDb, 'insights'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.warn("Could not load insights from Firebase (might not exist yet).", error);
      return [];
    }
  }

  public async saveInsight(insight: any): Promise<void> {
    const { id, ...data } = insight;
    const safeId = id || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const docRef = doc(firestoreDb, 'insights', safeId);
    await setDoc(docRef, data);
  }

  public async deleteInsight(id: string): Promise<void> {
    const docRef = doc(firestoreDb, 'insights', id);
    await deleteDoc(docRef);
  }
`;

content = content.replace(methods, "");
content = content.replace("  public async deleteEntry", methods + "\n  public async deleteEntry");

fs.writeFileSync('utils/database.ts', content);
console.log("Fixed database.ts");
