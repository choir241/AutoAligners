import { toast } from "react-toastify";
import { Client, Account, ID } from "appwrite";
import { ISignUp } from "../../interfaces/Auth";
import { handleLogin } from "./handleLogin";

export async function handleSignUp(props: ISignUp): Promise<void> {
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject(import.meta.env.VITE_REACT_APP_PROJECT); // Your project ID

    const account = new Account(client);

    // Register User
    const createAccount = await account.create(
      ID.unique(),
      props.email,
      props.password,
      props.name,
    );

    handleLogin({
      email: props.email,
      password: props.password,
      name: props.name,
    });
  } catch (err) {
    toast.error(`${err}`);
    console.error(err);
  }
}
