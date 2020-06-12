export type DBState = {
  db: DB | null
  isLoaded: boolean
}

export type DB = PouchDB.Database
