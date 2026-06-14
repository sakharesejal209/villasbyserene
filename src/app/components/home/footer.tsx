"use client";

import React from "react";

import { Button, Divider, IconButton, Typography } from "@mui/material";

import {
  MdOutlineLocalPhone as Phone,
  MdOutlineMail as Mail,
} from "react-icons/md";
import { FaFacebook as Facebook } from "react-icons/fa6";
import {
  IoLogoInstagram as Instagram,
  IoLocationOutline as MapPin,
  IoLogoWhatsapp as WhatsApp,
} from "react-icons/io5";

import logoLight from "../../../../public/assets/villasbyserene-light.png";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  const handleWhatsAppContact = () => {
    const message =
      "Hi! I'd like to learn more about your holiday rental properties.";
    const whatsappUrl = `https://wa.me/9594377736?text=${encodeURIComponent(
      message,
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <footer
      // className="bg-gradient-to-r from-[#0F1419] to-[#1A1F24] text-white border-t border-gray-800/50"
      className="bg-[#272628] text-white"
    >
      {/* Main Footer Content */}
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center mb-1">
              <Image
                className="sm:w-22.5 xl:w-30 2xl:w-37.5"
                width={150}
                alt="VillasBySerene: Your boutique getaway!"
                src={logoLight}
              />
            </div>
            <Typography>Your boutique getaway!</Typography>
            <div className="flex gap-1 mt-3">
              <IconButton
                href="https://www.facebook.com/profile.php?id=61576583374198"
                target="_blank"
                aria-label="Facebook"
                size="small"
                sx={{ color: "#fff" }}
              >
                <Facebook className="w-5 h-5" />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/villasbyserene"
                target="_blank"
                aria-label="Instagram"
                size="small"
                sx={{ color: "#fff" }}
              >
                <Instagram className="w-5 h-5" />
              </IconButton>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <Typography color="secondary" variant="h6">
              Quick Links
            </Typography>
            <div className="my-3 flex flex-col items-start gap-1">
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="block text-gray-300 hover:text-white hover:cursor-pointer transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => {
                  router.push("/stays/all");
                }}
                className="block text-gray-300 hover:text-white hover:cursor-pointer transition-colors duration-200"
              >
                All Properties
              </button>
              <button
                onClick={() => {
                  router.push("/contact");
                }}
                className="block text-gray-300 hover:text-white hover:cursor-pointer transition-colors duration-200"
              >
                Contact Us
              </button>
              <button
                onClick={() => {
                  router.push("/our-story");
                }}
                className="block text-gray-300 hover:text-white hover:cursor-pointer transition-colors duration-200"
              >
                Our Story
              </button>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Typography color="secondary" variant="h6">
              Get in Touch
            </Typography>
            <div className="flex flex-col gap-1.5 my-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 95943 77736</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-primary" />
                <span>villasbyserene@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span>
                  B-104, Yashonarayan CHS., Takka Rd, Panvel
                  <br />
                  Raigad, Maharashtra 410206
                </span>
              </div>
            </div>

            <Button
              variant="contained"
              onClick={handleWhatsAppContact}
              className="w-full mt-4"
            >
              <WhatsApp className="mr-2 w-5 h-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>

      <Divider className="bg-gray-600" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 Villas By Serene. All rights reserved.
          </div>
          {/* <div className="flex gap-4 md:gap-6 text-sm text-gray-400">
            <div className="hover:text-white transition-colors duration-200 cursor-pointer">
              <Link href="/privacy">Privacy Policy</Link>
            </div>
            <div className="hover:text-white transition-colors duration-200 cursor-pointer">
              <Link href="/terms">Terms & Conditions</Link>
            </div>
            <div className="hover:text-white transition-colors duration-200 cursor-pointer">
              <Link href="/cancellation">Cancellation Policy</Link>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
