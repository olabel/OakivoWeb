/**
 * Oakivo Solutions Inc. - Persistent Data Architecture
 * Simulates a secure backend database for lead and applicant tracking.
 */

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
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
    
    const docRef = await addDoc(this.getCollection(), entryData);
    return { id: docRef.id, ...entryData } as DatabaseEntry;
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

  public async deleteEntry(id: string) {
    const docRef = doc(firestoreDb, 'entries', id);
    await deleteDoc(docRef);
  }
}

export const db = new OakivoDatabase();