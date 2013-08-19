;; Project values

(load-this-project
 `(
   (:search-extensions (".js" ".html" ".css" ".scss"))
   (:sass-watch-src-output-argument ,(concat (project-base-directory)))
    ) )
