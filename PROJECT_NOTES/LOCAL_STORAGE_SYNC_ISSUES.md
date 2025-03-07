# Local Storage Sync Issues

User can use the app on different clients (browsers).
User data should be synced, what can be achieved by
- fetching needed data when user is logged
- and then by setting real-time listeners.

But this approach requires fetching a lot of data
(in our case (currently) - all tags & probably all notes in future to enable content search & other notes features),
what can encrease data usage and lead to reaching free limits in RTDB.

To overcome the issue, we should store user data in `localStorage` on every browser client.
When user logs in, we should
- [check stored stale data on the device](#check-stored-stale-data-on-the-device),
- update it
- and then set real-time listeners.

## Check Stored Stale Data On The Device

To be able to compare, what data is outdated, we should
- store each clients `syncedAt` prop

```
events/[userId]/[itemsType]
  /[crudType]
    /[id]: timestamp
```

## Possible Improvements

- encryption
- IndexDB instead of localStorage
