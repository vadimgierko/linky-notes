# Local Storage Sync Issues

User can use the app on different devices.
User data should be synced, what can be achieved by
- fetching needed data when user is logged
- and then by setting real-time listeners.

But this approach requires fetching a lot of data
(in our case (currently) - all tags),
what can encrease data usage and lead to reaching free limits in RTDB.

To overcome the issue, we should store user data in `localStorage` on every device (browser client).
When user logs in, we should
- [check stored stale data on the device](#check-stored-stale-data-on-the-device),
- update it
- and then set real-time listeners.

## Check Stored Stale Data On The Device

To be able to compare, what data is outdated, we should
- store each devices `syncedAt` prop

