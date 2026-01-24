/**
 * Oakivo Solutions Inc. - Persistent Data Architecture
 * Simulates a secure backend database for lead and applicant tracking.
 */

export interface DatabaseEntry {
  id: string;
  createdAt: string;
  type: 'lead' | 'applicant' | 'subscriber';
  data: any;
  status: 'new' | 'processed' | 'archived';
}

class OakivoDatabase {
  private STORAGE_KEY = 'oakivo_vault_v1';

  private getStore(): DatabaseEntry[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveStore(entries: DatabaseEntry[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
  }

  public saveEntry(type: DatabaseEntry['type'], data: any): DatabaseEntry {
    const entries = this.getStore();
    const newEntry: DatabaseEntry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      type,
      data,
      status: 'new'
    };
    
    entries.unshift(newEntry); // Newest first
    this.saveStore(entries);
    return newEntry;
  }

  public getAllEntries(): DatabaseEntry[] {
    return this.getStore();
  }

  public updateStatus(id: string, status: DatabaseEntry['status']) {
    const entries = this.getStore();
    const index = entries.findIndex(e => e.id === id);
    if (index !== -1) {
      entries[index].status = status;
      this.saveStore(entries);
    }
  }

  public deleteEntry(id: string) {
    const entries = this.getStore().filter(e => e.id !== id);
    this.saveStore(entries);
  }

  public clear() {
    this.saveStore([]);
  }
}

export const db = new OakivoDatabase();