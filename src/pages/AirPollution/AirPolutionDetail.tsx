import * as React from "react";
import { useState } from "react";
import { components } from "../../types/types";
interface Prop {
  components?: components;
}
const AirPolutionDetail: React.FC<Prop> = ({ components }) => {
  return (
    <>
      <div className="row row-cols-1 g-3">
        <div className="col">
          <div className="row">
            <div className="col-2 fs-5">
              PM<sub>2.5</sub>
            </div>
            <div className="col">
              Vật chất dạng hạt mịn là các hạt ô nhiễm hít được có đường kính
              dưới 2,5 micro mét có khả năng đi vào trong phổi và dòng máu, gây
              ra nhiều vấn đề nghiêm trọng về sức khỏe. Tác động nghiêm trọng
              nhất là ở phổi và tim. Nếu tiếp xúc có thể dẫn đến tình trạng ho
              hoặc khó thở, làm trầm trọng thêm bệnh hen suyễn và hình thành
              bệnh đường hô hấp mãn tính.
            </div>
            <div className="col-2 text-end">{components?.pm2_5} µg/m³</div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-2 fs-5">
              PM<sub>10</sub>
            </div>
            <div className="col">
              Vật chất dạng hạt là các hạt ô nhiễm hít được có đường kính dưới
              10 micro mét. Các hạt lớn hơn 2,5 micro mét có thể tích tụ trong
              đường dẫn khí, gây ra nhiều vấn đề về sức khỏe. Nếu tiếp xúc nhiều
              có thể dẫn đến tình trạng kích ứng mắt và cổ họng, ho hoặc khó thở
              cũng như làm trầm trọng thêm bệnh hen suyễn. Tiếp xúc quá mức và
              thường xuyên có thể dẫn đến nhiều tác động nghiêm trọng đến sức
              khỏe.
            </div>
            <div className="col-2 text-end">{components?.pm10} µg/m³</div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-2 fs-5">
              O<sub>3</sub>
            </div>
            <div className="col">
              Ôzôn mặt đất có thể làm nặng thêm các bệnh về đường hô hấp bị sẵn
              và cùng có thể dẫn đến tình trạng kích ứng cổ họng, đau đầu và đau
              ngực.
            </div>
            <div className="col-2 text-end">{components?.o3} µg/m³</div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-2 fs-5">
              SO<sub>2</sub>
            </div>
            <div className="col">
              Tiếp xúc lưu huỳnh điôxít (SO2) có thể dẫn đến tình trạng kích ứng
              mắt và cổ họng đồng thời làm trầm trọng thêm bệnh hen suyễn và
              bệnh viêm cuống phổi mãn tính.
            </div>
            <div className="col-2 text-end">{components?.so2} µg/m³</div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-2 fs-5">
              NO<sub>2</sub>
            </div>
            <div className="col">
              Hít thở trong môi trường có điôxít nitơ (NO2) ở mức cao có khả
              năng tăng nguy cơ gặp vấn đề về đường hô hấp. Các triệu chứng
              thường gặp là ho và khó thở, còn các vấn đề sức khỏe nghiêm trọng
              hơn như nhiễm trùng đường hô hấp có thể xuất hiện nếu tiếp xúc
              trong thời gian dài hơn.
            </div>
            <div className="col-2 text-end">{components?.no2} µg/m³</div>
          </div>
        </div>
        <div className="col">
          <div className="row">
            <div className="col-2 fs-5">CO</div>
            <div className="col">
              Cacbon monoxit (CO) là khí không màu không mùi và khi hít phải ở
              mức cao có thể gây ra đau đầu, buồn nôn, chóng mặt và nôn mửa.
              Tiếp xúc nhiều lần trong thời gian dài có thể dẫn đến bệnh về tim
            </div>
            <div className="col-2 text-end">{components?.co} µg/m³</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirPolutionDetail;
