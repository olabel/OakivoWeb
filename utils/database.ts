/**
 * Oakivo Solutions Inc. - Persistent Data Architecture
 * Simulates a secure backend database for lead and applicant tracking.
 */

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, setDoc } from 'firebase/firestore';
import { db as firestoreDb } from './firebase';

export interface DatabaseEntry {
  id: string;
  createdAt: string;
  type: 'lead' | 'applicant' | 'subscriber';
  data: any;
  status: 'new' | 'processed' | 'archived';
}

class OakivoDatabase {
  private getCollection() {
    return collection(firestoreDb, 'entries');
  }

  public async saveEntry(type: DatabaseEntry['type'], data: any): Promise<DatabaseEntry> {
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
  }

  public async getAllEntries(): Promise<DatabaseEntry[]> {
    const q = query(this.getCollection(), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DatabaseEntry));
  }

  public async updateStatus(id: string, status: DatabaseEntry['status']) {
    const docRef = doc(firestoreDb, 'entries', id);
    await updateDoc(docRef, { status });
  }


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

  public async deleteEntry(id: string) {
    const docRef = doc(firestoreDb, 'entries', id);
    await deleteDoc(docRef);
  }
}


export const db = new OakivoDatabase();