[33mcommit 829f2da0604ccfcfa5f1e27ae6ac2e48450584c3[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m)[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Wed Aug 14 23:16:58 2024 +0200

    google auth removed

[33mcommit 0deb9599dc33aaa31de2f150889c3af7c23b9e5e[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Wed Aug 14 23:15:33 2024 +0200

    commit fix

[33mcommit 15f9ffe053550dfd57863862d59e417c85d9a0d4[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Wed Aug 14 23:14:16 2024 +0200

    AuthContainer AND AuthContextProvider fully implemented

[33mcommit 5262729aa5958d33f33f5449ab1bc8792f38ff25[m[33m ([m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Aug 11 18:11:10 2024 +0200

    region selector fixed in mobile view

[33mcommit fa1ea33576845abce8774f3f869510ae76566633[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Aug 11 16:41:39 2024 +0200

    Implements episode details and fixes navbar responsivity

[33mcommit abd4bdebc032f2d171c7708994a2eee46ef0c12b[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Aug 11 12:48:33 2024 +0200

    Implements a skeleton system in detailed page and also implements the correct functonalities of detailed page, with regions and providers. TODO: navbar correct scaling when in responsive mode

[33mcommit 5315bfc94f5c5095c681c7f0d3aadacd5e41e14c[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Fri Aug 9 23:12:18 2024 +0200

    Region and season based provider fetching is working

[33mcommit 15b734e1e76f4692f63c864895bf161be8f80b16[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Fri Aug 9 22:24:52 2024 +0200

    Implements correct routing with id param passing and error handling

[33mcommit d44742997689cf3402ec4cdca12061116841efcb[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Thu Aug 8 22:08:22 2024 +0200

    Darkmode works, and routing works to test page, TODO: connect page to card.

[33mcommit eb742c2725d364bffb7e5fa3eff4c67811621ba0[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Thu Aug 8 21:47:31 2024 +0200

    Separates onApplySearch to a searchModeContextProvider

[33mcommit 7fa484b0be888f9d450e8ae847404d0831c6e04e[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jul 27 21:58:23 2024 +0200

    TODO: implement details when clicking on a tvShowCard with react-router-dom

[33mcommit e7142ce977e95f1475e17161f89f95010fa7207c[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jul 27 21:52:28 2024 +0200

    adds param object instead of forming the endpoint manually and reverts the grid to use skeletons

[33mcommit 24924f2f3eb00c8e53628384bd2e7ac576326b71[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jul 27 21:39:40 2024 +0200

    Infinite scrolling now works with discover and quicksearch

[33mcommit 321897acdcdae28ee13a6e18dcd402ebcfd0fd33[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jul 27 21:17:11 2024 +0200

    implements working infinite query with load more button on discover endpoint

[33mcommit 617f530ec3596cfea94f06e56b056755e3b9f723[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jul 27 20:59:14 2024 +0200

    Remove useData hooke for custom implementation in customDataHook level, for pagination and different responses

[33mcommit 06e78ddd6bd987ca95ceb1f279ec15afc2ec5d78[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Fri Jul 26 22:50:42 2024 +0200

    uses react useQuery hook

[33mcommit c3245030edd0b7fa2ae5c51bfbcdfdb778e59ffe[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Fri Jul 26 22:39:42 2024 +0200

    adds infinity query package

[33mcommit fa8e933dfa10435bbf67a1e44291d1e002336940[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Mon Jul 22 22:09:48 2024 +0200

    Fixes remaining cases of filtering with heading, next refactor querries with react-query

[33mcommit 97abe3d471d208b340db37572c58fd59a3f50955[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Mon Jul 22 20:21:27 2024 +0200

    fixes tvshow query when no platform selected

[33mcommit 99872efbe929e034c4d72618ee53b540a41bea0f[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Mon Jul 22 20:12:27 2024 +0200

    fixes discover filter when only a region is selected

[33mcommit 9748ffe57ecee3bc9dcb2f4b48b23ab93607b8e8[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Mon Jul 22 19:56:38 2024 +0200

    adds error message to platform and region selector components

[33mcommit 5b91d7aa0aae5abe4869e7b2a751c30bad324117[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Mon Jul 22 19:43:01 2024 +0200

    gets the regions from the movie db api, implements region interface, set region on apply, funnels it to platforms

[33mcommit 1ffc8d862be8582174f8656b0abac6a5e920df80[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jul 20 20:44:49 2024 +0200

    fixes provieder list by region, todo, connect regions and filter by region also tv-show cards

[33mcommit cd91004cb92d9b92efb923b0d4d305a157b3be67[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Fri Jun 21 17:32:33 2024 +0200

    cleanup

[33mcommit 58c3777fc4ec4a1767d61f2748093660ae013eb6[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Jun 16 23:40:34 2024 +0200

    refactor: Clean up UI, add logo click functionality, and implement region selector component without fetching or setting the query yet

[33mcommit 0ee43467f884729b9a678bc152f0da7edf0ec5b0[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Jun 16 23:10:54 2024 +0200

    Changes logo, cleanes up interactions between quick search and filtering and ads a heading component to show what is the current filter or query

[33mcommit f1d4423f528856c72bf8c1b061f84537191df9f3[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Jun 16 22:02:24 2024 +0200

    implements quick-searching state and quick search fetching with searchbar

[33mcommit 9254f6bdaca402e6e912ca5f4d240f12f471b524[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Jun 16 18:08:14 2024 +0200

    Cleanes up platform slector a bit, no need to store selected platform state twice

[33mcommit 1f4aa1acd3d790087c53453eebd9111e816b0f01[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Jun 16 17:52:14 2024 +0200

    implements search by platform, needs refactoring, but its in working state

[33mcommit bc2c98268c28a8162673e2c9aa8168677608da7f[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sun Jun 16 13:21:32 2024 +0200

    implemetns use platforms hook to fetch platform and platform selector now uses this hook and filter for platforms that are available in Hungary

[33mcommit 8efbac5933d4fd9613709167ef97a76b916df319[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jun 15 22:45:39 2024 +0200

    implements multiple genre selector

[33mcommit 8d61aaa116e62c726aa2b9491cbcf1997cd1d93d[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jun 15 21:25:04 2024 +0200

    Cleans up the feel of the ui and ads light mode app icon and context based state sharing

[33mcommit 1c5d60bc40c94e2d8e1c8175b477403fc38e113c[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jun 15 17:18:13 2024 +0200

    Creates a generic data fetching hook

[33mcommit 7d52d7955038f3de3b4fed52f9aaff97e3294463[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jun 15 15:53:34 2024 +0200

    implements useGenre hook to fetch genres for tvShows, and a GenreList component to display it in the aside section of the layout

[33mcommit a646fb3b78f9b13fa173a01d428a913721e05ff2[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Sat Jun 15 14:29:40 2024 +0200

    refactors popular tv fetching hook and implements rating badge component

[33mcommit bbceb4f060d702d285e2164744fb95199de6f330[m
Author: Molnar Milan <molnarmilan.cc@gmail.com>
Date:   Fri Jun 14 23:10:55 2024 +0200

    creates custom hook for fetching tvShows

[33mcommit 811e6d84e815f4222497e9360f0015e4b599ba8f[m
Author: Molnar Milan <molnarmila