import { Card, Button, Typography, Input, Dialog, DialogHeader, DialogBody, DialogFooter, Alert } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/UseAuth";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function OrganizationProfile() {
  const [organization, setOrganization] = useState({});
  const [codes, setCodes] = useState([]);
  const [users, setUsers] = useState([]);
  const [funds, setFunds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fundingModalOpen, setFundingModalOpen] = useState(false);
  const [alert, setAlert] = useState({ vis: false, color: "", msg: "" });
  const [activationQuantity, setActivationQuantity] = useState("");
  const [fundName, setFundName] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [fundTarget, setFundTarget] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + "/organization", {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrganization(res.data);
        setUsers(res.data.users);
        setFunds(res.data.fundings);
        setCodes(res.data.activationCodes);
      })
      .catch((error) => {
        console.error("Error fetching organization data:", error);
      });
  }, [auth.user]);

  const handleActivationCodeSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        import.meta.env.VITE_REACT_BASE_URL + "/organization/generateCode",
        { count: activationQuantity },
        {
          headers: {
            Authorization: auth.user,
          },
        }
      )
      .then((response) => {
        setCodes((prevCodes) => [...prevCodes, ...response.data.codes]); // Assuming response contains the new codes
        setAlert({ vis: true, color: "green", msg: "Activation codes created successfully!" });
        setModalOpen(false);
        setActivationQuantity("");
      })
      .catch((error) => {
        console.error("Error creating activation codes:", error);
        setAlert({ vis: true, color: "red", msg: "Failed to create activation codes!" });
      });
  };

  const handleAddFundingSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        import.meta.env.VITE_REACT_BASE_URL + "/organization/addFunding",
        { name: fundName, fundRupee: BigInt(fundAmount), target: fundTarget },
        {
          headers: {
            Authorization: auth.user,
          },
        }
      )
      .then((response) => {
        setFunds((prevFunds) => [...prevFunds, response.data.funding]); // Assuming response contains the new funding
        setAlert({ vis: true, color: "green", msg: "Funding added successfully!" });
        setFundingModalOpen(false);
        setFundName("");
        setFundAmount("");
        setFundTarget("");
      })
      .catch((error) => {
        console.error("Error adding funding:", error);
        setAlert({ vis: true, color: "red", msg: "Failed to add funding!" });
      });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Organization Profile Card */}
      <Card className="p-6 bg-white rounded-lg shadow-lg mb-8 flex flex-col items-center">
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS46R2VPL90F2IJBZmlhrL73sfCDmucjZdK6g&s"} alt={organization.name} className="w-32 h-32 rounded-full mb-4" />
        <Typography variant="h4" className="text-green-900 font-bold">
          {organization.name}
        </Typography>
        <Typography variant="small" className="text-gray-600">
          Email: {organization.email}
        </Typography>
      </Card>

      {/* Create Activation Code and Add Funding Buttons */}
      <div className="flex justify-between mb-6">
        <Button size="lg" className="bg-green-800 text-white rounded-lg shadow-md hover:bg-green-700 transition" onClick={() => setModalOpen(true)}>
          Create Activation Code
        </Button>
        <Button size="lg" className="bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-700 transition" onClick={() => setFundingModalOpen(true)}>
          Add Funding
        </Button>
      </div>

      {/* User Table */}
      <Card className="h-full w-full overflow-scroll border border-blue-gray-100 rounded-xl mb-4 shadow-lg">
        <table className="bg-white rounded-lg w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Username</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">First Name</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Last Name</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-green-50 cursor-pointer" onClick={() => navigate(`/user/${user.username}`)}>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.firstname}</td>
                <td className="p-2">{user.lastname}</td>
                <td className="p-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Funds Table */}
      <Card className="h-full w-full overflow-scroll border border-blue-gray-100 rounded-xl mb-4 shadow-lg">
        <table className="bg-white rounded-lg w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Name</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Total Allocation</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Target</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={index} className="hover:bg-green-50">
                <td className="p-2">{fund.name}</td>
                <td className="p-2">{fund.fundRupee.toLocaleString()}</td>
                <td className="p-2">{fund.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Activation Codes Table */}
      <Card className="h-full w-full overflow-scroll border border-blue-gray-100 rounded-xl shadow-lg">
        <table className="bg-white rounded-lg w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Activation Code</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Created At</th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code, index) => (
              <tr key={index} className="hover:bg-green-50">
                <td className="p-2">{code.code}</td>
                <td className="p-2">{moment(code.createdAt).format("D MMM YYYY")}</td>
                <td className={`p-2 ${code.isUsed ? "text-green-500" : "text-red-500"}`}>{code.isUsed ? "Activated" : "Remaining"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Create Activation Code Modal */}
      <Dialog open={modalOpen} handler={() => setModalOpen(!modalOpen)} size="sm" className="bg-white rounded-lg p-6">
        <DialogHeader>
          <Typography variant="h5" className="text-green-900 font-bold">
            Create Activation Code
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleActivationCodeSubmit}>
            <Input type="number" label="Quantity" value={activationQuantity} onChange={(e) => setActivationQuantity(e.target.value)} className="mb-4" required />
            <DialogFooter>
              <Button type="submit" className="bg-green-800 text-white rounded-lg shadow-md hover:bg-green-700 transition">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>

      {/* Add Funding Modal */}
      <Dialog open={fundingModalOpen} handler={() => setFundingModalOpen(!fundingModalOpen)} size="sm" className="bg-white rounded-lg p-6">
        <DialogHeader>
          <Typography variant="h5" className="text-blue-900 font-bold">
            Add Funding
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleAddFundingSubmit}>
            <Input type="text" label="Funding Name" value={fundName} onChange={(e) => setFundName(e.target.value)} className="mb-4" required />
            <Input type="number" label="Amount" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} className="mb-4" required />
            <Input type="text" label="Target" value={fundTarget} onChange={(e) => setFundTarget(e.target.value)} className="mb-4" required />
            <DialogFooter>
              <Button type="submit" className="bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>

      {/* Success/Error Alert */}
      {alert.vis && (
        <Alert color={alert.color} open={alert.vis} className="mt-4">
          {alert.msg}
        </Alert>
      )}
    </div>
  );
}
