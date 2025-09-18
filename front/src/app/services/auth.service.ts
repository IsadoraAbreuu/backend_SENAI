import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";

type TokenPair = {acess: string; refresh?: string}

const storage = {
    get: (k: string) => (typeof localStorage !== 'undefined' ? localStorage.getItem(k) : null), //serve para pegar o token
    set: (k: string, v: string) => {if (typeof localStorage !== 'undefined') localStorage.setItem(k, v)}
}