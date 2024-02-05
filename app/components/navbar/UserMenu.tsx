"use client";

import { use, useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
// import useRentModal from "@/app/hooks/useRentModal";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { decodeToken } from "@/app/actions/DecodeToken";
import Link from "next/link";

const UserMenu = () => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  //   const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.refresh();
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setToken(jwt!);
    const user = decodeToken(token);
    if (user) {
      setUserRole(user.userRole);
    }
  }, [token]);

  // const onRent = useCallback(() => {
  //   if (!currentUser) {
  //     return loginModal.onOpen();
  //   }

  //   rentModal.onOpen();
  // }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
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
          gap-8
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src="" />
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-full
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              {userRole === "user" && (
                <MenuItem
                  label="My bookings"
                  onClick={() => router.push("/userBookings")}
                />
              )}

              <hr />
            </>

            <>
              {!token ? (
                <MenuItem label="Login" onClick={loginModal.onOpen} />
              ) : (
                <MenuItem label="Logout" onClick={logout} />
              )}
              <MenuItem label="Sign up" onClick={registerModal.onOpen} />
            </>
            {userRole === "manager" && (
              <Link href="/manager">
                {" "}
                <MenuItem label="Manager Area" />
              </Link>
            )}

            <Link href="/aboutus">
              {" "}
              <MenuItem label="About Us" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
