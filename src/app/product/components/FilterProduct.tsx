"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FilterProduct = () => {
  const [filterValue, setFilterValue] = useState("");
  const { push } = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams();
    const page = searchParams.get("page");
    if (filterValue) {
      searchParams.set("order", filterValue);
      push(`?${searchParams.toString()}&page=${!!page ? page : 1}`);
    } else {
      searchParams.delete("order");
      push(`?${searchParams.toString()}`);
    }
  }, [filterValue]);

  return (
    <div>
      <div>
        <select
          className="border px-10 outline-none"
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="">فیلتر بر اساس</option>
          <option value="expensive">گران ترین</option>
          <option value="cheap">ارزان ترین</option>
          <option value="mix">میکس</option>
          <option value="pure">خالص</option>
          <option value="newset">جدیدترین</option>
          <option value="oldest">قدیمی ترین</option>
        </select>
      </div>
    </div>
  );
};

export default FilterProduct;
