import React from "react";

const FeedCard = ({ user }) => {
  const { firstName, lastName, photoURL, about, skills, gender } = user;

  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-2xl border border-base-300">
      {/* 1. Image Section */}
      <figure className="px-2 pt-2">
        <img
          src={photoURL}
          alt={firstName}
          className="rounded-xl h-60 w-full object-cover shadow-inner bg-base-200"
        />
      </figure>

      <div className="card-body">
        {/* 2. Header: Name and Gender */}
        <div className="flex justify-between items-start">
          <h2 className="card-title text-xl font-bold">
            {firstName} {lastName}
          </h2>
          <div className="badge badge-secondary badge-sm uppercase">
            {gender}
          </div>
        </div>

        {/* 3. About Section */}
        <p className="text-sm opacity-80 line-clamp-3 my-2">
          {about || "No bio available."}
        </p>

        {/* 4. Skills Section */}
        <div className="flex flex-wrap gap-2 mt-2">
          {skills?.map((skill, index) => (
            <div key={index} className="badge badge-outline badge-sm">
              {skill}
            </div>
          ))}
        </div>

        {/* 5. Action Buttons */}
        <div className="card-actions justify-between mt-6">
          <button className="btn btn-ghost text-error hover:bg-error/10 flex-1">
            Pass
          </button>
          <button className="btn btn-primary flex-1 shadow-lg shadow-primary/20">
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
