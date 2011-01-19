<div class="post">
    <p class="meta">
      <span class="date"><abbr class="timeago" title="${creation_date_iso}">${creation_date}</abbr></span>
      <span class="posted"><img width="30" height="30" src="http://www.gravatar.com/avatar/${owner.email_hash}" /></a>
      <span class="posted">Posted by <a href="${user_url}">${owner.display_name}</a>
      </span>
    </p>
    <div class="entry">
      <p><a href="${question_url}">${title}</a></p>
    </div>
    <p class="links">
      <span class="statistics">
        Votes : <a href="${question_url}">${score}</a>
            / Answers : <a href="${question_url}">${answer_count}</a>
              / Views : <a href="${question_url}">${view_count}</a>
      </span>
      <span class="tags">
      Tags : 
            {{each tags}}
              <a href="${base_url}/questions/tagged/${$value}">${$value}</a>
            {{/each}}
      </span>
    </p>
  </div>