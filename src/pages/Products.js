import { useState, useEffect } from "react";
import { Space, Table } from "antd";
import UpdateData from "../components/UpdateData";
import DeleteData from "../components/DeleteData";
import AddDataModal from "../components/AddDataModal";
import Nav from "../components/Nav";
import './Products.css';
import AuthUser from '../components/AuthUser';


const { Column } = Table;

export default function Products() {
  const [productData, getProductData] = useState([]);
  const { http } = AuthUser();

  const getData = () => {
    http
      .get(`/products`)
      .then((res) => {
        const data = res.data;
        getProductData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);


  const updateList = () => {
    getData();
  };

  return (
    <div>
      <div className="add_btn">
        <AddDataModal onAdd={updateList} />
      </div>
      <div className="products">
        <Table dataSource={productData} size='small' className="product_table">
          <Column title="Product Name" dataIndex="product_name" key="product_name" />
          <Column title="Product Price" dataIndex="product_price" key="product_price" />
          <Column
            title=""
            dataIndex="_id"
            key="action"
            render={(id, values) => (
              <Space>
                <UpdateData values={values} onUpdate={updateList} />
                {/* <DeleteData id={values.id} onClick={DeleteData} /> */}
                <DeleteData id={values.id} onDelete={updateList} />
              </Space>
            )}
          />
        </Table>
      </div>
      <div className="logout">
        <Nav />
      </div>
    </div>
  );
}
