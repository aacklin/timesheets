import React from "react";
import { observer } from "mobx-react-lite";
import { ListItem, ListItemText, ListItemMeta, List, ListDivider } from "@rmwc/list";
import { useRegistrationStore } from "../../stores/registration-store";
import { useViewStore } from "../../stores/view-store";

export const RegistrationsListTotal = observer(() => {
    const timesheets = useRegistrationStore();
    const view = useViewStore();

    const totalTime = timesheets.registrationsTotalTime;

    const Total = () => (
        <ListItem key={`total-month`} disabled={true}>
            <ListItemText>
                {`Total in ${view.moment.format('MMMM')}`}
            </ListItemText>
            <ListItemMeta>
                {parseFloat(totalTime.toFixed(2)) + " hours"}
            </ListItemMeta>
        </ListItem>
    );

    return (
        <List style={{ width: "100%" }}>
            <ListDivider />
            <Total />
            <ListDivider />
        </List>
    )
});
