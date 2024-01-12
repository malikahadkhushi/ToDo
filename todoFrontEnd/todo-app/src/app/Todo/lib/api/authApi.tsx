import baseUrl from "@/app/config/constants";
type userCredentialsType = {
  email: string;
  password: string;
};

// Login Api
export const userAuth = async (userCredentials: userCredentialsType) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

interface userDataInterface {
  email:string,
  password:string,
  profileImage:string,
  profession:string,
  userName:string
}

export const postData =async (userData:userDataInterface)=>{

  try {
      const response = await fetch(`${baseUrl}/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
    }

}
