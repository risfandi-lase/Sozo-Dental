import React from "react";
import AddPatientModal from "../Components/AddPatientModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import rita from "../assets/rita.jpg";
import pranowo from "../assets/pranowo.jpeg";
import mahfud from "../assets/mahfud.jpg";

function Reservations() {
  return (
    <div className="font-figtree w-full">
      <div className="overflow-x-auto">
        <table className="table  ">
          {/* head */}
          <thead className="bg-base-300">
            <tr>
              <th className="w-1">
                GMT <br />
                +07:00
              </th>
              <th>
                <div className="flex gap-2 items-center">
                  <div>
                    {" "}
                    <img
                      src={rita}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    {" "}
                    <p className="text-black text-base">Drg Rita Mackenzie</p>
                    <p className="text-gray-400 text-xs font-normal mt-1">
                      Today's appointment:{" "}
                      <span className="text-black">5 patients</span>
                    </p>
                  </div>
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center">
                  <div>
                    {" "}
                    <img
                      src={mahfud}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    {" "}
                    <p className="text-black text-base">Drg Mahfud Antasari</p>
                    <p className="text-gray-400 text-xs font-normal mt-1">
                      Today's appointment:{" "}
                      <span className="text-black">5 patients</span>
                    </p>
                  </div>
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center">
                  <div>
                    {" "}
                    <img
                      src={pranowo}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    {" "}
                    <p className="text-black text-base">Drg Pranowo Anlubis</p>
                    <p className="text-gray-400 text-xs font-normal mt-1">
                      Today's appointment:{" "}
                      <span className="text-black">5 patients</span>
                    </p>
                  </div>
                </div>
              </th>{" "}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>9am</th>
              <td className="p-1">
                <div className="bg-red-100 hover:bg-red-200 flex gap-2 rounded-xl p-2 relative cursor-pointer">
                  <div>
                    <Icon
                      icon="clarity:dollar-solid"
                      width="20"
                      className=""
                      style={{ color: "#ff4949" }}
                    />
                  </div>

                  <div className="flex items-center gap-2 px-2 bg-white border-none border rounded-2xl absolute top-3 right-3 ">
                    <div
                      aria-label="success"
                      className="status status-success "
                    ></div>
                    <p>Finished</p>
                  </div>
                  <div>
                    <p>Sekar Mulawarman</p>
                    <p className="text-gray-400 ">9 AM > 10 AM</p>
                    <p className="badge badge-outline badge-error rounded-full my-4  bg-white text-xs">
                      General Checkup
                    </p>
                  </div>
                </div>
              </td>{" "}
              <td className="p-1">
                <div className="bg-[repeating-linear-gradient(45deg,#f1f5f9_0px,#f1f5f9_10px,#e2e8f0_10px,#e2e8f0_20px)] rounded-2xl opacity-80 flex items-center justify-center p-12">
                  <span className="text-gray-500 text-xs font-medium">
                    NOT AVAILABLE
                  </span>
                </div>
              </td>
              <td></td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>10am</th>
              <td className="p-1">
                <div className="hover:bg-gray-300 rounded-2xl opacity-80 flex items-center justify-center p-14"></div>
              </td>{" "}
              <td className="p-1">
                <div className="bg-red-100 hover:bg-red-200 flex gap-2 rounded-xl p-2 relative cursor-pointer">
                  <div>
                    <Icon
                      icon="lsicon:check-correct-filled"
                      width="20"
                      className=""
                      style={{ color: "#00b93e" }}
                    />
                  </div>

                  <div className="flex items-center gap-2 px-2 bg-white border-none border rounded-2xl absolute top-3 right-3 ">
                    <div
                      aria-label="success"
                      className="status status-success "
                    ></div>
                    <p>Finished</p>
                  </div>
                  <div>
                    <p>Dian Sulistia</p>
                    <p className="text-gray-400 ">10 AM > 11 AM</p>
                    <p className="badge badge-outline badge-error rounded-full my-4  bg-white text-xs">
                      General Checkup
                    </p>
                  </div>
                </div>
              </td>
              <td></td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>11am</th>
              <td className="p-1">
                <div className="bg-green-100 hover:bg-green-200 flex gap-2 rounded-xl p-2 relative cursor-pointer">
                  <div>
                    <Icon
                      icon="lsicon:check-correct-filled"
                      width="20"
                      className=""
                      style={{ color: "#00b93e" }}
                    />
                  </div>

                  <div className="flex items-center gap-2 px-2 bg-white border-none border rounded-2xl absolute top-3 right-3 ">
                    <div
                      aria-label="warning"
                      className="status status-warning "
                    ></div>
                    <p>Encounter</p>
                  </div>
                  <div>
                    <p>Rafli Zainuddin</p>
                    <p className="text-gray-400 ">11 AM > 12 AM</p>
                    <p className="badge badge-outline badge-success rounded-full my-4  bg-white text-xs">
                      Scalling
                    </p>
                  </div>
                </div>
              </td>{" "}
              <td></td>
              <td>Eureka Jonas</td>
            </tr>
            <tr>
              <th>12am</th>
              <td className="p-1">
                <div className="bg-blue-100 hover:bg-blue-200 flex gap-2 rounded-xl p-2 relative cursor-pointer">
                  <div>
                    <Icon
                      icon="streamline-block:basic-ui-time-2"
                      width="16"
                      className=""
                      style={{ color: "#0462fd" }}
                    />
                  </div>

                  <div className="flex items-center gap-2 px-2 bg-white border-none border rounded-2xl absolute top-3 right-3 ">
                    <div
                      aria-label="info"
                      className="status status-info "
                    ></div>
                    <p>Registered</p>
                  </div>
                  <div>
                    <p>Handi Handoko</p>
                    <p className="text-gray-400 ">12 AM > 1 PM</p>
                    <p className="badge badge-outline badge-info rounded-full my-4  bg-white text-xs">
                      Bleaching + Scalling
                    </p>
                  </div>
                </div>
              </td>{" "}
              <td></td>
              <td className="p-1">
                <div className="bg-[repeating-linear-gradient(45deg,#f1f5f9_0px,#f1f5f9_10px,#e2e8f0_10px,#e2e8f0_20px)] rounded-2xl opacity-80 flex items-center justify-center p-12">
                  <span className="text-gray-500 text-xs font-medium">
                    NOT AVAILABLE
                  </span>
                </div>
              </td>
            </tr>
            <tr className="bg-base-200">
              <th className="bg-base-100">1pm</th>
              <td className="relative p-4">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(241,245,249,0.6)_0px,rgba(241,245,249,0.6)_10px,rgba(226,232,240,0.6)_10px,rgba(226,232,240,0.6)_20px)] opacity-60"></div>
                <div className="relative flex items-center justify-center h-full gap-2"></div>
              </td>{" "}
              <td className="relative p-4">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(241,245,249,0.6)_0px,rgba(241,245,249,0.6)_10px,rgba(226,232,240,0.6)_10px,rgba(226,232,240,0.6)_20px)] opacity-60"></div>
                <div className="relative flex items-center justify-center h-full gap-2">
                  <Icon
                    icon="mdi:coffee"
                    width="16"
                    className="text-gray-400"
                  />
                  <span className="text-gray-500 text-xs font-medium">
                    BREAK TIME
                  </span>
                </div>
              </td>
              <td className="relative p-4">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(241,245,249,0.6)_0px,rgba(241,245,249,0.6)_10px,rgba(226,232,240,0.6)_10px,rgba(226,232,240,0.6)_20px)] opacity-60"></div>
                <div className="relative flex items-center justify-center h-full gap-2"></div>
              </td>{" "}
            </tr>
            <tr>
              <th>2pm</th>
              <td className="p-1">
                <div className="bg-[repeating-linear-gradient(45deg,#f1f5f9_0px,#f1f5f9_10px,#e2e8f0_10px,#e2e8f0_20px)] rounded-2xl opacity-80 flex items-center justify-center p-12">
                  <span className="text-gray-500 text-xs font-medium">
                    NOT AVAILABLE
                  </span>
                </div>
              </td>
              <td></td>
              <td>Eureka Jonas</td>
            </tr>
            <tr>
              <th>3pm</th>
              <td>Mariana Handoko</td>
              <td></td>
              <td>Eureka Jonas</td>
            </tr>
            <tr>
              <th>4pm</th>
              <td>Mariana Handoko</td>
              <td className="p-1">
                <div className="bg-[repeating-linear-gradient(45deg,#f1f5f9_0px,#f1f5f9_10px,#e2e8f0_10px,#e2e8f0_20px)] rounded-2xl opacity-80 flex items-center justify-center p-12">
                  <span className="text-gray-500 text-xs font-medium">
                    NOT AVAILABLE
                  </span>
                </div>
              </td>
              <td>Eureka Jonas</td>
            </tr>
            <tr>
              <th>5pm</th>
              <td>Mariana Handoko</td>
              <td></td>
              <td>Eureka Jonas</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reservations;
