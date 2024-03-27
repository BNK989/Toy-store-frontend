import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { ToyIndex } from './pages/ToyIndex'
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'
import { HomePage } from './pages/HomePage'
import { UserMsg } from './cmps/UserMsg'
import { AppHeader } from './cmps/AppHeader'

export function App() {
  return <main className="main-toy-app">
    <AppHeader />
    <Routes>
      <Route element={<ToyDetails />} path="/toy/details/:toyId" />
      {/* Add&Edit in 1 route */}
      <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
      <Route element={<ToyIndex />} path="/toy" />
      <Route element={<HomePage />} path="/" />
    </Routes>

    <UserMsg />
  </main >

}


