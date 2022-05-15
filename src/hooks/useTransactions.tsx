import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transaction{
    id: number,
    title: string,
    amount: number,
    type:string,
    category:string,
    createdAT:string
}

// interface TransactionInput{
//     title: string,
//     amount: number,
//     type:string,
//     category:string
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAT'>;
    //Irá herdar todas todos os campos do 'Transaction' menos o 'id' e o 'createAT' pois estou omitindo(Omit); 

interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

 const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps){

    const [transactions, setTransactions] =  useState<Transaction[]>([])

    useEffect(() =>{
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAT: new Date(),
        })
        const {transaction} = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }


    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}


export function useTransactions(){
    const context = useContext(TransactionsContext);
    return context;
}
