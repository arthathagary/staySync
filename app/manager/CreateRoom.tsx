"use client";

import { useRouter } from "next/navigation";
import React, { use, useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../components/Avatar";
import MenuItem from "../components/navbar/MenuItem";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";

import Container from "../components/Container";
import Logo from "../components/navbar/Logo";
import { decodeToken } from "../actions/DecodeToken";

interface UserMenuProps {
  currentUser?: any;
}
const CreateRoom = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const [token, setToken] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setToken(jwt!);
    const user = decodeToken(token);
    if (user) {
      setUserEmail(user.email);
    }
  }, [token, userEmail]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    // if (!currentUser) {
    //   return loginModal.onOpen();
    // }

    rentModal.onOpen();
  }, [rentModal]);
  return (
    <div
      className="fixed w-full bg-white z-10 shadow-sm  py-4 
    border-b-[1px]"
    >
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Logo />
          </div>
          <div>
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={() => router.push("/manager")}
                  className="
          hidden
          md:block
          text-sm 
          font-semibold 
          py-3 
          px-4 
          rounded-full 
          hover:bg-neutral-100 
          transition 
          cursor-pointer
        "
                >
                  Dashboard
                </div>
                <div
                  onClick={onRent}
                  className="
          hidden
          md:block
          text-sm 
          font-semibold 
          py-3 
          px-4 
          rounded-full 
          hover:bg-neutral-100 
          transition 
          cursor-pointer
        "
                >
                  Create Room
                </div>
                <div
                  onClick={() => router.push("/bookings")}
                  className="
          hidden
          md:block
          text-sm 
          font-semibold 
          py-3 
          px-4 
          rounded-full 
          hover:bg-neutral-100 
          transition 
          cursor-pointer
        "
                >
                  Bookings
                </div>
                <div
                  className="
          hidden
          md:block
          text-sm 
          font-semibold 
          py-3 
          px-4 
          rounded-full 
          hover:bg-neutral-100 
          transition 
          cursor-pointer
        "
                  onClick={() => router.push("/bookingsHistory")}
                >
                  Bookings History
                </div>
                <div
                  onClick={toggleOpen}
                  className="
        p-4
        md:py-1
        md:px-2
        border-[1px] 
        border-neutral-200 
        flex 
        flex-row 
        items-center 
        gap-3 
        rounded-full 
        cursor-pointer 
        hover:shadow-md 
        transition
        "
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    <Avatar src={currentUser?.image} />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div
                  className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-3/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
        "
                >
                  <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                      <>
                        {/* <MenuItem
                      label="My rooms"
                      onClick={() => router.push("/properties")}
                    /> */}

                        <hr />
                        {/* <MenuItem label="Logout" onClick={() => signOut()} /> */}
                      </>
                    ) : (
                      <>
                        {!token ? (
                          <MenuItem label="Login" onClick={loginModal.onOpen} />
                        ) : (
                          <MenuItem label="Logout" onClick={logout} />
                        )}
                        <MenuItem
                          label="Sign up"
                          onClick={registerModal.onOpen}
                        />
                        <h1 className="font-bold ml-4 pb-2">({userEmail})</h1>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateRoom;
