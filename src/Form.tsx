import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { addData, removeData } from './formSlice';
import { Button, Form as AntdForm, Input, Select, Table, Checkbox } from 'antd';

// import type { DatePickerProps } from 'antd';
// import { DatePicker, Space } from 'antd';


const { Option } = Select;

const Form = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [form] = AntdForm.useForm();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.data);

  const handleSubmit = (values: any) => {
    dispatch(addData(values));
    form.resetFields();
  };
  const handleClear = () => {
    form.resetFields();
    setSelectedRows([]);
  };
  const handleSelectRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };
  const handleRemoveSelected = () => {
    dispatch(removeData(selectedRows));
    setSelectedRows([]);
  };
  const handleRemoveAll = () => {
    dispatch(removeData(undefined));
    setSelectedRows([]);
  };
  
//   const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
// };

  //ตารางหลังบันทึกเเล้ว
  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'เพศ',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'หมายเลขโทรศัพท์',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'สัญชาติ',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: 'เลือก',
      dataIndex: 'select',
      key: 'select',
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedRows.includes(record.key)}
          onChange={() => handleSelectRow(record.key)}
        />
      ),
    },
  ];

  

  return (
    <div>
      
      <h1 style={{ paddingTop: '1mm' }}>แบบฟอร์มข้อมูล</h1>
      <AntdForm form={form} onFinish={handleSubmit}>
        <div style={{ paddingLeft: '25%', paddingRight: '25%' }}>
          <AntdForm.Item label="คำนำหน้าชื่อ" name="prefix" className="form-item">
            <Select placeholder="โปรดเลือก">
              <Option value="">โปรดเลือก</Option>
              <Option value="นาย">นาย</Option>
              <Option value="นาง">นาง</Option>
              <Option value="นางสาว">นางสาว</Option>
            </Select>
          </AntdForm.Item>

          <AntdForm.Item label="ชื่อ-นามสกุล" name="fullName" className="form-item">
            <Input />
          </AntdForm.Item>

          <AntdForm.Item label="วันเกิด" name="birthday">
            <Input />
            {/* <DatePicker onChange={onChange}/> */}
          </AntdForm.Item>

          <AntdForm.Item label="สัญชาติ" name="nationality">
            <Input />
          </AntdForm.Item>

          <AntdForm.Item label="เลขบัตรประชาชน" name="idNumber">
            <Input />
          </AntdForm.Item>

          <AntdForm.Item label="เพศ" name="gender">
            <Select placeholder="โปรดเลือก">
              <Option value="">โปรดเลือก</Option>
              <Option value="ผู้ชาย">ผู้ชาย</Option>
              <Option value="ผู้หญิง">ผู้หญิง</Option>
            </Select>
          </AntdForm.Item>

          <AntdForm.Item label="หมายเลขโทรศัพท์" name="phoneNumber">
            <Input />
          </AntdForm.Item>

          <AntdForm.Item label="หนังสือเดินทาง" name="passport">
            <Input />
          </AntdForm.Item>

          <AntdForm.Item label="เงินเดือน" name="salary">
            <Input />
          </AntdForm.Item>

          <div>
            <Button type="primary" htmlType="submit">
              บันทึก  
            </Button>
            <Button type="link" style={{borderColor:"blue",backgroundColor:"white"}} onClick={handleClear}>
              ล้างข้อมูล
            </Button>
          </div>
        </div>
      </AntdForm>

      <h2>ข้อมูลที่บันทึกแล้ว:</h2>
      <div>
        <Button style={{color:"red",borderColor:"red",padding:"10,10,10,10"}} onClick={handleRemoveSelected}>ลบข้อมูล</Button>
        <Button style={{color:"red",borderColor:"red",padding:"10,10,10,10"}} onClick={handleRemoveAll}>ลบข้อมูลทั้งหมด</Button>
        
      </div>
      <br/>
      <Table columns={columns} dataSource={formData} />
    </div>
  );
};

export default Form;
