const populateBy = key => {
  const by = {
    ["user"]: () => {
      return [
        {
          path: "following",
          select: "username",
          model: "User"
        },
        {
          path: "followers",
          select: "username",
          model: "User"
        },
        {
          path: "posts",
          model: "Post",
          options: { sort: { date: -1 } },
          populate: [
            {
              path: "author",
              select: "firstName username",
              model: "User"
            },
            {
              path: "likes",
              select: "username",
              model: "User"
            },
            {
              path: "hashtags",
              model: "Hashtag"
            },
            {
              path: "comments",
              model: "Comment",
              options: { sort: { date: -1 } },
              populate: [
                {
                  path: "user",
                  select: "username",
                  model: "User"
                }
              ]
            }
          ]
        },
        {
          path: "causes",
          model: "Cause",
          options: { sort: { date: -1 } },
          populate: [
            {
              path: "author",
              select: "username orgName",
              model: "User"
            },
            {
              path: "likes",
              select: "username",
              model: "User"
            }
          ]
        }
      ];
    },
    ["causes"]: () => {
      return [
        {
          path: "author",
          select: "username orgName",
          model: "User"
        },
        {
          path: "likes",
          model: "User",
          populate: {
            path: "user",
            model: "User"
          }
        }
      ];
    },
    ["comments"]: () => {
      return {
        path: "user",
        path: "likes",
        populate: {
          path: "user",
          model: "User"
        }
      };
    },
    ["post"]: () => {
      return [
        {
          path: "author",
          select: "username",
          model: "User"
        },
        {
          path: "hashtags",
          model: "Hashtag"
        },
        {
          path: "likes",
          select: "username",
          model: "User"
        },
        {
          path: "comments",
          model: "Comment",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "user",
            select: "username",
            model: "User"
          }
        }
      ];
    },
    ["hashtag"]: () => {
      return [
        {
          path: "posts",
          model: "Post",
          options: { sort: { date: -1 } },
          populate: [
            {
              path: "author",
              select: "firstName username",
              model: "User"
            },
            {
              path: "likes",
              select: "username",
              model: "User"
            },
            {
              path: "hashtags",
              model: "Hashtag"
            },
            {
              path: "comments",
              model: "Comment",
              options: { sort: { date: -1 } },
              populate: [
                {
                  path: "user",
                  select: "username",
                  model: "User"
                }
              ]
            }
          ]
        },
        {
          path: "causes",
          model: "Cause",
          options: { sort: { date: -1 } },
          populate: [
            {
              path: "author",
              select: "username orgName",
              model: "User"
            },
            {
              path: "likes",
              select: "username",
              model: "User"
            }
          ]
        }
      ];
    }
  };

  return by.hasOwnProperty(key) ? by[key]() : null;
};

module.exports = populateBy;
