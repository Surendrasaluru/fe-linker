<div className="space-y-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <p className="text-[13px] font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] opacity-40">
                {article.readable_publish_date}
              </span>
              <span className="text-[10px] opacity-40">•</span>
              <span className="text-[10px] opacity-40">
                {article.public_reactions_count} reactions
              </span>
            </div>
          </a>
        ))}
      </div>