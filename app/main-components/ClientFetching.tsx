"use client";
import { Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import bridg from "bridg";

export default function ClientFetching() {
  const [teachers, setTeachers] = useState<Teacher[]>();

  useEffect(() => {
    bridg.teacher
      .findMany({
        where: {
          schoolId: 4,
        },
      })
      .then((teachers) => setTeachers(teachers));
  }, []);

  return (
    <div>
      {teachers && teachers.length > 0 ? (
        teachers.map((t) => (
          <h1 className="font-semibold" key={t.id}>
            {" "}
            {t.firstName} {t.lastName}{" "}
          </h1>
        ))
      ) : (
        <p> No Data Fetched </p>
      )}
    </div>
  );
}
