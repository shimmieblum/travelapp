"use client";

import { Box, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export interface AuthNavLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthNavLink({ text, linkText, href }: AuthNavLinkProps) {
  return (
    <Box sx={{ mt: 2, textAlign: "center" }}>
      <Typography variant="body2">
        {text}{" "}
        <MuiLink component={Link} href={href}>
          {linkText}
        </MuiLink>
      </Typography>
    </Box>
  );
}