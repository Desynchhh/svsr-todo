import { ToastStatus } from "../types";
import { useEffect } from "react";

type Props = {
    status: ToastStatus;
    message: string;
    autoHide?: number;
}
export default function Toast({ status, message, autoHide = 2500 }: React.PropsWithChildren<Props>) {
    useEffect(() => {
        setTimeout(() => {
            status = "daisy-alert-success";
            message = "";
        }, autoHide);
    }, []);

    return (
        status && message &&
        <div className="daisy-toast daisy-toast-right daisy-toast-bottom">
            <div className={`daisy-alert daisy-alert-info ${status}`}>
                <span>{message}</span>
            </div>
        </div>
    );
}