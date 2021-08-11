/* eslint-disable react/jsx-one-expression-per-line */
/*
; =======================================================
; Title: index.js - GoWilderApp - footer component folder 
; Authors: Aaron Wilson
; Instructor: Sean Bernath
; Date: May 08, 2021
; Description: Build out app's index.js file.
; Legend: [ Aaron Wilson ] -> Team member responsible
; for page.
; =======================================================
*/

import styles from './footer.module.css';

import React from 'react';

export default function Footer() {
  return (
    <div className={styles.footerBackground}>
      <footer className="border-top text-center small text-muted py-3">
        <p className="m-0">
          Copyright &copy; 2021{' '}
          <a href="/" className={styles.centerText}>
            FamilySocial App
          </a>
          . Project & Pofolio V Example.
        </p>
      </footer>
    </div>
  );
}
