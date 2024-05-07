const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error("API_URL is not defined in the environment variables");
}

export const getUser = async (username: string) => {

  const res = await fetch(`${apiUrl}/api/users/${username}`, {
    cache: "no-store",
  })
  const result = await res.json();
  return result.user;
}

export const getUserImage = async (username: string) => {

  const res = await fetch(`${apiUrl}/api/users/${username}/image`, {
    cache: "no-store",
  })
  const result = await res.json();
  return result;
}

export const getNickname = async (username: string) => {

  const res = await fetch(`${apiUrl}/api/users/${username}/nickname`, {
    cache: "no-store",
  })
  const result = await res.json();
  return result.nickname;
}

export const getTweets = async (username: string) => {
  if (username === "0") {
    var res = await fetch(`${apiUrl}/api/tweets`, {
      cache: "no-store"
    })
  } else {
    var res = await fetch(`${apiUrl}/api/users/${username}/tweets`, {
      cache: "no-store"
    })
  }
  const result = await res.json();
  return result.tweets;
}

export const getTweet = async (tweetId: string) => {

  const res = await fetch(`${apiUrl}/api/tweets/${tweetId}`, {
    cache: "no-store",
  })
  const result = await res.json();
  return result.tweet;
}

export const deleteLike = async (tweetId: string, username: string) => {
  const res2 = await fetch(`${apiUrl}/api/users/${username}/likes/${tweetId}`, {
    method: "DELETE",
  })
  const result2 = await res2.json();

  const res1 = await fetch(`${apiUrl}/api/tweets/${tweetId}/likes`, {
    method: "DELETE",
  })
  const result1 = await res1.json();
  // return result.tweet;
  return result1 + result2;
}

export const sendLike = async (tweetId: string, username: string) => {
  const res1 = await fetch(`${apiUrl}/api/tweets/${tweetId}/likes`, {
    method: "PUT",
  })
  const result1 = await res1.json();
  // return result.tweet;
  const res2 = await fetch(`${apiUrl}/api/users/${username}/likes`, {
    method: "POST",
    body: JSON.stringify({ id: tweetId }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result2 = await res2.json();
  return result1 + result2;
}

export const sendShare = async (tweetId: string, username: string) => {
  const res1 = await fetch(`${apiUrl}/api/tweets/${tweetId}/shares`, {
    method: "PUT",
  })
  const result1 = await res1.json();
  // return result.tweet;
  const res2 = await fetch(`${apiUrl}/api/users/${username}/shares`, {
    method: "POST",
    body: JSON.stringify({ id: tweetId }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result2 = await res2.json();
  return result1 + result2;
}

export const deleteShare = async (tweetId: string, username: string) => {
  const res1 = await fetch(`${apiUrl}/api/tweets/${tweetId}/shares`, {
    method: "DELETE",
  })
  const result1 = await res1.json();
  // return result.tweet;
  const res2 = await fetch(`${apiUrl}/api/users/${username}/shares/${tweetId}`, {
    method: "DELETE",
  })
  const result2 = await res2.json();
  return result1 + result2;
}


