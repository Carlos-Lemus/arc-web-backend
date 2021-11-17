import { connect } from "mongoose";

export const connection = async (): Promise<void> => {
   await connect(process.env.DB_URL_CONNECTION!);
};
