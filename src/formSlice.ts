import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//ข้อมูลที่ใช้เก็บข้อมูลในแบบฟอร์ม
interface FormData {
  prefix: string;
  fullName: string;
  birthday: string;
  nationality: string;
  idNumber: string;
  gender: string;
  phoneNumber: string;
  passport: string;
  salary: string;
}

//สร้างของสถานะ (state) ในส่วนของ form ใน Redux โดยมี property เดียวคือ data ซึ่งเป็นอาร์เรย์ของ FormData ที่ใช้เก็บข้อมูลที่ถูกส่งเข้ามา
interface FormState {
  data: FormData[];
}

//กำหนดค่าเริ่มต้นให้กับ FormState โดยกำหนดให้ data เป็นอาร์เรย์ที่ว่างเปล่า
const initialState: FormState = {
  data: [],
};


//ใช้สร้าง Slice ใน Redux โดยใช้ createSlice จาก @reduxjs/toolkit ซึ่งมีการกำหนดชื่อ Slice เป็น 'form' และกำหนด initialState และ reducers
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {

    //เพิ่มข้อมูลใหม่เข้าไปใน data โดยใช้ action.payload ที่เป็นข้อมูลที่ส่งเข้ามาใน action
    addData: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
    },

    //ล้างข้อมูลทั้งหมดใน data โดยกำหนดให้ data เป็นอาร์เรย์ที่ว่างเปล่า
    clearData: (state) => {
      state.data = [];
    },

    //ลบข้อมูลออกจาก data โดยใช้ action.payload ที่เป็นอาร์เรย์ของเลข index ที่ต้องการลบออก หรือถ้าไม่ได้ส่ง payload มาให้ล้างข้อมูลทั้งหมดใน data
    removeData: (state, action: PayloadAction<number[] | undefined>) => {
        if (action.payload) {
          const indicesToRemove = action.payload;
          state.data = state.data.filter((_, index) => !indicesToRemove.includes(index));
        } else {
          state.data = [];
        }
      },
      

      
  },
});

export const { addData, clearData, removeData } = formSlice.actions;
export default formSlice.reducer;

