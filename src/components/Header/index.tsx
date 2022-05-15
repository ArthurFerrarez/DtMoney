import { useState } from 'react';
import Modal from 'react-modal';
import logoImg from '../../assets/logo.svg';
import { Conatiner, Content } from './styles';

interface HeaderProps{
    onOpenNewTransactionModal: () => void; //essa propriedade é uma função e retorna vazio
}

export function Header({onOpenNewTransactionModal}: HeaderProps){


return (
    <Conatiner>
        <Content>
            <img src={logoImg} alt="dt money" />
            <button type="button" onClick={onOpenNewTransactionModal}>
                Nova Transação
            </button>

            
        </Content>
    </Conatiner>
)
}