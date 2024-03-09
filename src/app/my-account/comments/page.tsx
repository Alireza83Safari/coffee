import { authOptions } from "@/libs/authOptions";
import { apiUrl } from "@/services/apiUrl";
import { CommentType } from "@/types/comment";
import { getServerSession } from "next-auth";
import React from "react";
import Link from "next/link";

const getMyComments = async (userId: string) => {
  const res = await fetch(`${apiUrl}/api/comment/${userId}`);
  const data = await res.json();
  return data;
};

export default async function page() {
  const session = await getServerSession(authOptions);
  const myComments = await getMyComments((session as any)?.id);

  return (
    <section className="grid grid-cols-2">
      {myComments?.map((comment: CommentType) => (
        <Link
          href={comment?.product?._id}
          className="grid grid-cols-2 border mx-2 p-3 min-h-[11rem] min-w-full col-span-2 hover:bg-slate-50 duration-500 rounded-lg xs:text-base text-sm"
        >
          <div className="flex items-center md:col-span-1 col-span-2">
            <p className="ml-1 text-textGray">محصول:</p>
            <p>{comment?.product?.name}</p>
          </div>

          <div className="flex items-center">
            <p className="ml-1 text-textGray">امتیاز:</p>
            <p className={comment?.rate > 3 ? "text-green" : "text-red-500"}>
              {comment?.rate}
            </p>
          </div>

          <div className="flex items-center">
            <p className="ml-1 text-textGray">وضعیت:</p>
            <p
              className={
                comment?.status === "pending"
                  ? "text-orange-500"
                  : comment?.status === "accept"
                  ? "text-green"
                  : "text-red-600"
              }
            >
              {comment?.status === "pending"
                ? "انتظار برای تایید"
                : comment?.status === "accept"
                ? "پذیفته شده"
                : "رد شده"}
            </p>
          </div>

          <div className="flex items-center">
            <p className="ml-1 text-textGray">زمان:</p>
            <p>{comment?.createdAt.slice(0, 10)}</p>
          </div>

          <div className="flex items-center col-span-2">
            <p className="ml-1 text-textGray">نظر:</p>
            <p>{comment?.body}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
