import { atom } from 'recoil';

const localStorageCart = localStorage.getItem('cart');
const initialCart = localStorageCart ? JSON.parse(localStorageCart) : [];

const cartAtom = atom({
    key: 'cartAtom',
    default: initialCart,
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newCart) => {
                localStorage.setItem('cart', JSON.stringify(newCart));
            });
        },
    ],
});

export default cartAtom;