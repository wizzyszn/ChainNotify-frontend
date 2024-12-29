export enum StorageKeysEnum {
    user = "user_data"
}

// * User
interface UserAuthInfoInt {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    created_at: string;
    isVerified?: boolean;
    avi ?: string;
    notificationPreferences : {
        email: boolean,
        push: boolean,
        sms ?: boolean
    },
    wallet: {
        balance: number,
        tokens: [],
        transactions: [],
        address : string
    },
}
type RejectedPayload = {
    status?: number;
    message?: string;
    status_code?: number;
    data?: [];
};

// ? GeneralReturnInt is to be used for all response that have status, message, status_code, data
interface GeneralReturnInt<T> {
    status: number;
    message: string;
    data: T;
    status_code: number;
}

interface Notifications {
    _id: string;
    hash: string;
    type : "sent" | "received" ;
    amount : number;
    token : string;
    date : Date;
    read : boolean;
    message : string;
    from : string;
  
}


    export type {
        UserAuthInfoInt,
        GeneralReturnInt,
        RejectedPayload,
        Notifications

    }