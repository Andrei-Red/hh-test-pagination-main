import Head from "next/head";
import React from "react";
import {Inter} from "next/font/google";
import {Alert, Container} from "react-bootstrap";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {CustomTable} from "@/table/customTabele";

const inter = Inter({subsets: ["latin"]});

type TUserItem = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  updatedAt: string
}

type TGetServerSideProps = {
  statusCode: number
  users: TUserItem[]
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const res = await fetch("http://localhost:3000/users", {method: 'GET'})
    if (!res.ok) {
      return {props: {statusCode: res.status, users: []}}
    }

    return {
      props: {statusCode: 200, users: await res.json()}
    }
  } catch (e) {
    return {props: {statusCode: 500, users: []}}
  }
}) satisfies GetServerSideProps<TGetServerSideProps>


const userValues = {
  id: {title: 'ID', key: 'id'},
  firstname: {title: 'Имя', key: 'firstname'},
  lastname: {title: 'Фамилия', key: 'lastname'},
  phone: {title: 'Телефон', key: 'phone'},
  email: {title: 'Email', key: 'email'},
  updatedAt: {title: 'Дата обновления', key: 'updatedAt'}
}


export default function Home({ statusCode, users }: TGetServerSideProps) {
  if (statusCode !== 200) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>;
  }

  return (
      <>
        <Head>
          <title>Тестовое задание</title>
          <meta name="description" content="Тестовое задание"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={inter.className}>
          <Container>
            <h1 className={'mb-5'}>Пользователи</h1>
            {/*// Rerender only CustomTable*/}
            {
              (users && userValues) ?
                <CustomTable dataSource={users} displayValues={userValues}/> :
                null
            }
            {/*// Rerender only CustomTable*/}
          </Container>
        </main>
      </>
  );
}
