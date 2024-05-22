import { DbRules } from "bridg/server";

// https://github.com/bridg-db/bridg#database-rules
export const rules: DbRules = {
  // global default, allow/block non-specified queries, set to true only in development
  default: false,
  // tableName: false | true,       - block/allow all queries on a table
  user: {
    // find: (uid) => ({ id: uid }) - query based authorization
    find: (uid) => false,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  parent: {
    find: (uid) => true,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  classes: {
    find: (uid) => true,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  school: {
    find: (uid) => true,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  admission: {
    find: (uid) => false,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  studentT: {
    find: (uid) => true,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  admissionStatus: {
    find: (uid) => false,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  student: {
    find: (uid) => true,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  teacher: {
    find: (uid) => true,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  studentRemarks: {
    find: (uid) => false,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  course: {
    find: (uid) => true,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  courseEnrollment: {
    find: (uid) => false,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
  classCourse: {
    find: (uid) => true,
    update: (uid, data) => false,
    create: (uid, data) => false,
    delete: (uid) => false,
  },
};
