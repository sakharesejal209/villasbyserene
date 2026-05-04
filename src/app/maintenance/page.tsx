// export default function MaintenancePage() {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         fontFamily: "sans-serif",
//         background: "#EEEAE8",
//         color: "#414042",
//         textAlign: "center",
//         padding: "2rem",
//       }}
//     >
//       <img
//         src="/inline-logo.png"
//         style={{ height: 56, marginBottom: 32 }}
//         alt="Villas By Serene"
//       />
//       <h1
//         style={{
//           fontSize: 28,
//           fontWeight: 700,
//           color: "#044231",
//           marginBottom: 12,
//         }}
//       >
//         We&apos;ll be back soon
//       </h1>
//       <p
//         style={{
//           fontSize: 15,
//           color: "#7C7670",
//           maxWidth: 400,
//           lineHeight: 1.6,
//         }}
//       >
//         We&apos;re making some improvements to the site. For bookings and
//         enquiries, reach us on WhatsApp.
//       </p>
//       <a
//         href={`https://wa.me/9594377736?text=${encodeURIComponent(
//           "Hi! I'd like to enquire about a villa stay with Villas By Serene.",
//         )}`}
//         style={{
//           marginTop: 28,
//           display: "inline-block",
//           background: "#25D366",
//           color: "#fff",
//           padding: "12px 28px",
//           borderRadius: 6,
//           textDecoration: "none",
//           fontWeight: 600,
//           fontSize: 14,
//         }}
//       >
//         WhatsApp Us
//       </a>
//     </div>
//   );
// }

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
    </div>
    // <div
    //   style={{
    //     minHeight: "100vh",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     fontFamily: "sans-serif",
    //     background: "#EEEAE8",
    //     color: "#414042",
    //     textAlign: "center",
    //     padding: "2rem",
    //   }}
    // >
    //   <img
    //     src="/inline-logo.png"
    //     style={{ height: 56, marginBottom: 32 }}
    //     alt="Villas By Serene"
    //   />
    //   <h1
    //     style={{
    //       fontSize: 28,
    //       fontWeight: 700,
    //       color: "#044231",
    //       marginBottom: 12,
    //     }}
    //   >
    //     We&apos;ll be back soon
    //   </h1>
    //   <p
    //     style={{
    //       fontSize: 15,
    //       color: "#7C7670",
    //       maxWidth: 400,
    //       lineHeight: 1.6,
    //     }}
    //   >
    //     We&apos;re making some improvements to the site. For bookings and
    //     enquiries, reach us on WhatsApp.
    //   </p>
    //   <a
    //     href={`https://wa.me/9594377736?text=${encodeURIComponent(
    //       "Hi! I'd like to enquire about a villa stay with Villas By Serene.",
    //     )}`}
    //     style={{
    //       marginTop: 28,
    //       display: "inline-block",
    //       background: "#25D366",
    //       color: "#fff",
    //       padding: "12px 28px",
    //       borderRadius: 6,
    //       textDecoration: "none",
    //       fontWeight: 600,
    //       fontSize: 14,
    //     }}
    //   >
    //     WhatsApp Us
    //   </a>
    // </div>
  );
}
