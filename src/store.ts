import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import formReducer from './formSlice';

//เป็น reducer หลักที่รวม reducer ทั้งหมดในแอปพลิเคชันเข้าด้วยกัน ในที่นี้มี formReducer เป็น reducer เดียวที่รวมกันเป็น rootReducer
const rootReducer = combineReducers({
  form: formReducer,
});

//กำหนดค่าในการจัดเก็บข้อมูลแบบต่อเนื่องโดยใช้ redux-persist ในที่นี้กำหนดค่า key เป็น 'root' เพื่อบอกว่าข้อมูลทั้งหมดจะถูกจัดเก็บใน key 'root' ใน localStorage หรือ storage ที่กำหนด โดยกำหนดให้จัดเก็บเฉพาะ form ใน whitelist
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['form'],        
  };
  
//เป็น reducer ที่ผ่านการปรับปรุงด้วย persistReducer โดยใช้ persistConfig ที่กำหนดไว้ ซึ่งเป็นการทำให้ rootReducer สามารถจัดเก็บข้อมูลได้ต่อเนื่อง
const persistedReducer = persistReducer(persistConfig, rootReducer);

//สร้าง store โดยใช้ configureStore จาก @reduxjs/toolkit โดยกำหนด reducer เป็น persistedReducer ที่ผ่านการปรับปรุงแล้ว
const store = configureStore({
  reducer: persistedReducer,
});

//สร้าง persistor โดยใช้ persistStore จาก redux-persist โดยใช้ store ที่สร้างขึ้นมา ซึ่งเป็นตัวจัดเก็บข้อมูลแบบต่อเนื่อง
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
