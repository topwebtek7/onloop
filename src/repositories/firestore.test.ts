import { DocumentData } from "@google-cloud/firestore";
import { expect } from "chai";
import db from "../db";
import FirestoreRepository from "./firestore.repository";

describe("FirestoreRepository", () => {
  const repository: FirestoreRepository = new FirestoreRepository(db, "test");
  let newDocumentId: string;

  describe("#create()", async () => {
    it("can create a document without errors", (done) => {
      const newDocument: DocumentData = { name: "test", test: true };
      repository.create(newDocument).then((ref) => {
        newDocumentId = ref.id
        expect(ref).to.be.an("Object");
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe("#readOne()", () => {
    it("can read a document without errors", (done) => {
      repository.readOne(newDocumentId).then((ref) => {
        expect(ref).to.be.an("Object");
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it("cannot read data from an undefined document", (done) => {
      repository.readOne("1234").then((ref) => {
        ref.get().then((snap) => {
          // tslint:disable-next-line:no-unused-expression
          expect(snap.exists).to.be.false;
          done();
        }).catch((err) => {
          done(err);
        });
      });
    });
  });

  describe("#readAll()", () => {
    it("can read all documents without errors", (done) => {
      repository.readAll().then((refs) => {
        if (refs.length < 3) {
          done(false);
        } else {
          done();
        }
      }).catch((err) => {
        done(err);
      });
    });
  });

  describe("#update()", () => {
    it("can update a document without errors", (done) => {
      const updatedDocument: DocumentData = { name: "Test" + Date.now().toString() };
      repository.update(newDocumentId, updatedDocument).then((ref) => {
        ref.get().then((snap) => {
          expect(snap.data()).to.include({ name: updatedDocument.name });
          done();
        }).catch((err) => {
          done(err);
        });
      });
    });
  });

  describe("#delete()", () => {
    it("can create and delete a document without errors", (done) => {
      repository.delete(newDocumentId).then((deletedRef) => {
        deletedRef.get().then((snap) => {
          // tslint:disable-next-line:no-unused-expression
          expect(snap.exists).to.be.false;
          done();
        }).catch((err) => {
          done(err);
        });
      });
    });

    it("cannot delete an wrong or undefined id", (done) => {
      const newDocument: DocumentData = { name: "A document to be deleted" };
      repository.create(newDocument).then((newRef) => {
        repository.delete(newRef.id + "error").then((deletedRef) => {
          deletedRef.get().then((snap) => {
            // tslint:disable-next-line:no-unused-expression
            expect(snap.exists).to.be.false;
          }).catch((err) => {
            done(err);
          });
          newRef.get().then((snap) => {
            // tslint:disable-next-line:no-unused-expression
            expect(snap.exists).to.be.true;
          }).catch((err) => {
            done(err);
          });
          done();
        });
      });
    });
  });
});
