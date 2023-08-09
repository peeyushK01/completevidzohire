export const signAuth = async (details) => {
  try {
    const result = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(details),
    });

    if (!result.ok) {
      const errorResponse = await result.json();
      throw new Error(errorResponse.message);
    }

    const results = await result.json();
    console.log(results);
  } catch (error) {
    console.log(error);

    return { em: true };
  }

  // return results
};

export const loginAuth = async (items) => {
  try {
    const result1 = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(items),
    });

    if (result1.status === 200) {
      const data = await result1.json();
      return data;
    } else if (result1.status === 500) {
      return null;
    }
  } catch (err) {
    console.log(err);
    return { token: null };
  }
};
export const getCandidate = async (items) => {
  const result1 = await fetch("/api/lookup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(items),
  });
  const resul = await result1.json();

  return resul;
};

// forget password

export const resetPassword = async (email) => {
  try {
    const response = await fetch("http://localhost:8080/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to Send mail");
  }
};
