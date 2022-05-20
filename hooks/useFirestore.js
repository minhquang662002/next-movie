import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const useFirestore = (inputCollection, condition) => {
  const [documents, setDocuments] = useState([]);
  console.log("running");
  useEffect(() => {
    let docRef = collection(db, inputCollection);

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      docRef = query(
        collection(db, inputCollection),
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    const unsub = onSnapshot(docRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setDocuments(data);
    });

    return unsub;
  }, [inputCollection, condition]);
  return documents;
};
