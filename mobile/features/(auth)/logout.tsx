import {Button} from "@/shared/ui/button";
import React from "react";
import {AuthStore} from "@/entities/auth";

export const Logout = () => {

  return (
    <Button onPress={AuthStore.instance.logout}>
      Выйти
    </Button>
  )
}