import { toast } from "react-toastify";
import { Client, Account, ID } from "appwrite";
import { AuthInterface } from "../../middleware/variables/Interfaces";
import api from "../../middleware/api/AppWrite";
import { setEmail, getEmail } from "../../middleware/variables/Sessions";

export async function Signup(props: AuthInterface) {
  try {
    props.setEmailCookie(props.email);
    setEmail(props.email);

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject(import.meta.env.VITE_PROJECT); // Your project ID

    const account = new Account(client);

    await account.create(ID.unique(), props.email, props.password);

    await api.getAccount();

    if (getEmail() !== "" && getEmail()) {
      props.navigate;
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
